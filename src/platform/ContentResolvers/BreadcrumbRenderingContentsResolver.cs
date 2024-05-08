using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Query;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Links;
using Sitecore.Mvc.Presentation;
using Sitecore.Speak.Applications.Dependencies;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IdentityModel.Protocols.WSTrust;
using System.Linq;
using XmCloudSXAStarter.Interface;
using XmCloudSXAStarter.Model;
using XmCloudSXAStarter.Repositories;

namespace XmCloudSXAStarter.ContentResolvers
{
    public class BreadcrumbRenderingContentsResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }
        protected IBreadcrumbRepository _breadcrumbRepository { get; set; }
        public BreadcrumbRenderingContentsResolver()
        {
            _breadcrumbRepository = new BreadcrumbRepository();
        }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {

            JObject jobject = new JObject()
            {
                ["seperator"] = new JObject(),
                ["items"] = new JArray()
            };
            try
            {
                var model = (BreadcrumbRenderingModel)_breadcrumbRepository.GetModel();
                jobject["seperator"] = new JObject()
                {
                    ["value"] = model.Separator
                };
                jobject["items"] = ProcessItems(model.Children);
            }
            catch (Exception ex)
            {
                Log.Error("BreadcrumbRenderingContentsResolver Error:" + ex.Message, ex, "BreadcrumbRenderingContentsResolver");
            }
            return jobject;
        }
        public JObject BreadcrumbModelConvertor(BreadcrumbRenderingModel breadcrumb)
        {
            return new JObject
            {
                ["name"] = breadcrumb.Name,
                ["url"] = LinkManager.GetItemUrl(breadcrumb.Item),
                ["children"] = ProcessItems(breadcrumb.Children)

            };
        }

        protected JArray ProcessItems(IEnumerable<BreadcrumbRenderingModel> items)
        {
            JArray jarray = new JArray();
            if (items != null && items.Any())
            {
                foreach (BreadcrumbRenderingModel obj in items)
                {
                    JObject jobject = BreadcrumbModelConvertor(obj);
                    jarray.Add((JToken)jobject);
                }
            }
            return jarray;
        }

    }
}
