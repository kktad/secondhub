using Sitecore.Data.Items;
using Sitecore.XA.Foundation.Variants.Abstractions.Models;
using System.Collections.Generic;

namespace XmCloudSXAStarter.Model
{
    public class BreadcrumbRenderingModel : VariantsRenderingModel
    {
        public IEnumerable<BreadcrumbRenderingModel> Children { get; set; }

        public string Separator { get; set; }

        public bool IsFake { get; set; }

        public virtual string Name { get; set; }

        public BreadcrumbRenderingModel()
        {
        }

        public BreadcrumbRenderingModel(Item item) => this.Item = item;
    }
}