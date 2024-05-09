using Sitecore.Data.Items;
using System.Collections.Generic;
using ComponentsLibrary.Model;

namespace ComponentsLibrary.Repositories
{
    internal class FakeBreadcrumbRepository : BreadcrumbRepository
    {
        public override IEnumerable<BreadcrumbRenderingModel> GetBreadcrumbItems(
          Item currentItem,
          Item rootItem)
        {
            List<BreadcrumbRenderingModel> breadcrumbItems = new List<BreadcrumbRenderingModel>();
            for (int index = 0; index < 3; ++index)
            {
                BreadcrumbRenderingModel breadcrumbModel = this.CreateBreadcrumbModel((Item)null, index, 2, (IEnumerable<BreadcrumbRenderingModel>)null, string.Format("Tag Level {0}", (object)index));
                breadcrumbItems.Add(breadcrumbModel);
            }
            return (IEnumerable<BreadcrumbRenderingModel>)breadcrumbItems;
        }
    }
}