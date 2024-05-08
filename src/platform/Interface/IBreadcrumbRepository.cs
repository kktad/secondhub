using Sitecore.Data.Items;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using System.Collections.Generic;

namespace XmCloudSXAStarter.Interface
{
    public interface IBreadcrumbRepository : IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        IEnumerable<Item> BuildBreadcrumb(Item currentItem, Item rootItem);
    }
}
