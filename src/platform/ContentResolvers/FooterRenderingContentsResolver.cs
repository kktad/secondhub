using Newtonsoft.Json.Linq;
using Sitecore;
using Sitecore.Common;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.Helpers;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Links;
using Sitecore.Mvc.Presentation;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using XmCloudSXAStarter.SitecoreFieldHelpers;

namespace XmCloudSXAStarter.ContentResolvers
{
    public class FooterRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        public FooterRenderingContentsResolver()
        {
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            Log.Info("FooterRenderingContentsResolver has been hit", "");
            Assert.ArgumentNotNull((object)rendering, nameof(rendering));
            Assert.ArgumentNotNull((object)renderingConfig, nameof(renderingConfig));
            Item contextItem = this.GetContextItem(rendering, renderingConfig);
            if (contextItem == null)
                return (object)null;
            if (string.IsNullOrWhiteSpace(this.ItemSelectorQuery))
                return (object)this.ProcessItem(contextItem, rendering, renderingConfig);
            JObject jobject = new JObject()
            {
                ["items"] = (JToken)new JArray()
            };
            IEnumerable<Item> items = this.GetItems(contextItem);
            List<Item> list = items != null ? items.ToList<Item>() : (List<Item>)null;
            if (list == null || list.Count == 0)
                return (object)jobject;
            jobject["items"] = (JToken)this.ProcessItems((IEnumerable<Item>)list, rendering, renderingConfig);
            return (object)jobject;
        }
        protected virtual IEnumerable<Item> GetItems(Item contextItem)
        {
            Assert.ArgumentNotNull((object)contextItem, nameof(contextItem));
            return string.IsNullOrWhiteSpace(this.ItemSelectorQuery) ? Enumerable.Empty<Item>() : (IEnumerable<Item>)contextItem.Axes.SelectItems(this.ItemSelectorQuery);
        }

        protected virtual Item GetContextItem(
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            if (this.UseContextItem)
                return Context.Item;
            if (string.IsNullOrWhiteSpace(rendering.DataSource))
                return (Item)null;
            Item contextItem = ((CustomItemBase)rendering.RenderingItem)?.Database.GetItem(rendering.DataSource);
            if (contextItem != null)
                return contextItem;
            DataUri dataUri = DataUri.Parse(rendering.DataSource);
            if (dataUri == null)
                return (Item)null;
            return ((CustomItemBase)rendering.RenderingItem)?.Database.GetItem(dataUri);
        }

        protected virtual JArray ProcessItems(
          IEnumerable<Item> items,
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            JArray jarray = new JArray();
            foreach (Item obj in items)
            {
                JObject jobject1 = this.ProcessItem(obj, rendering, renderingConfig);
                JObject jobject2 = new JObject()
                {
                    ["link"] = GeneralLink.GetUrl(obj.Fields["Link"], "FooterRenderingContentsResolver", obj.Paths.FullPath),
                    ["text"] = obj.Fields["Text"].Value
                };
                jarray.Add((JToken)jobject2);
            }
            return jarray;
        }

        protected virtual JObject ProcessItem(
          Item item,
          Rendering rendering,
          IRenderingConfiguration renderingConfig)
        {
            Assert.ArgumentNotNull((object)item, nameof(item));
            using (new SettingsSwitcher("Media.AlwaysIncludeServerUrl", (Switcher<bool, IncludeServerInMediaUrlSwitcher>.CurrentValue || this.IncludeServerUrlInMediaUrls).ToString()))
                return JObject.Parse(renderingConfig.ItemSerializer.Serialize(item));
        }
    }
}
