using Sitecore.Data.Fields;
using Sitecore.LayoutService.Helpers;
using Sitecore.Links;
using Sitecore.Resources.Media;
using System;
using System.Security.Policy;

namespace XmCloudSXAStarter.SitecoreFieldHelpers
{
    public static class LinkExtensions
    {
        public static string GetUrl(LinkField linkField, Object owner, string itemPath)
        {
            string url = String.Empty;

            switch (linkField.LinkType)
            {
                case "internal":
                    url = LinkManager.GetItemUrl(linkField.TargetItem, ItemUrlHelper.GetLayoutServiceUrlOptions());
                    break;
                case "external":
                case "mailto":
                case "anchor":
                case "javascript":
                    url = linkField.Url;
                    break;
                case "media":
                    Sitecore.Data.Items.MediaItem media = new Sitecore.Data.Items.MediaItem(linkField.TargetItem);
                    url = Sitecore.StringUtil.EnsurePrefix('/',
                    Sitecore.Resources.Media.MediaManager.GetMediaUrl(media));
                    break;
                case "":
                    break;
                default:
                    string message = String.Format("{0} : Unknown link type {1} in {2}", owner.GetType(), linkField.LinkType, itemPath);
                    Sitecore.Diagnostics.Log.Error(message, owner);
                    break;
            }

            return url;
        }
        public static string GetImageUrl(this ImageField imageField)
        {
            string url = MediaManager.GetMediaUrl(imageField.MediaItem);
            return url;
        }

    }
}
