using Microsoft.Extensions.DependencyInjection;
using Sitecore.Data.Items;
using Sitecore.DependencyInjection;
using Sitecore.XA.Foundation.IoC;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using Sitecore.XA.Foundation.RenderingVariants.Repositories;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;
using Sitecore.XA.Foundation.Variants.Abstractions.Fields;
using System;
using System.Collections.Generic;
using System.Linq;
using XmCloudSXAStarter.Interface;
using XmCloudSXAStarter.Model;

namespace XmCloudSXAStarter.Repositories
{
    public class BreadcrumbRepository : VariantsRepository,
    IBreadcrumbRepository,
    IModelRepository,
    IControllerRepository,
    IAbstractRepository<IRenderingModelBase>
    {
        public virtual IEnumerable<BreadcrumbRenderingModel> GetBreadcrumbItems(
      Item currentItem,
      Item rootItem)
        {
            List<Item> list = this.BuildBreadcrumb(currentItem, rootItem).Where<Item>(new Func<Item, bool>(this.ShowInBreadcrumb)).ToList<Item>();
            int count = list.Count;
            return list.Select<Item, BreadcrumbRenderingModel>((Func<Item, int, BreadcrumbRenderingModel>)((item, index) => this.CreateBreadcrumbModel(item, index, count, this.AddChildren(item), (string)null)));
        }

        protected virtual BreadcrumbRenderingModel CreateBreadcrumbModel(
          Item item,
          int index,
          int count,
          IEnumerable<BreadcrumbRenderingModel> children,
          string name)
        {
            List<string> stringList = new List<string>();
            if (count == 1 || index == count - 1)
                stringList.Add("last");
            if (index == 0)
                stringList.Add("home");
            BreadcrumbRenderingModel breadcrumbModel = new BreadcrumbRenderingModel(item);
            breadcrumbModel.Name = item.Fields[Sitecore.XA.Foundation.Navigation.Templates._Navigable.Fields.NavigationTitle].Value ?? item.DisplayName;
            breadcrumbModel.Children = children;
            breadcrumbModel.CssClasses = (IEnumerable<string>)stringList;
            breadcrumbModel.VariantFields = (IEnumerable<BaseVariantField>)this.VariantFields;
            breadcrumbModel.Separator = this.Rendering.Parameters["Separator"];
            return breadcrumbModel;
        }

        protected virtual bool ShowInBreadcrumb(Item item)
        {
            if (!item.DoesItemInheritFrom(Sitecore.XA.Foundation.Navigation.Templates._Navigable.ID))
                return false;
            string parameter = this.Rendering.Parameters["Filter"];
            return string.IsNullOrEmpty(item[Sitecore.XA.Foundation.Navigation.Templates._Navigable.Fields.NavigationFilter]) || string.IsNullOrEmpty(parameter) || string.IsNullOrEmpty(item[Sitecore.XA.Foundation.Navigation.Templates._Navigable.Fields.NavigationFilter]) || !item[Sitecore.XA.Foundation.Navigation.Templates._Navigable.Fields.NavigationFilter].Contains(parameter);
        }

        protected virtual IEnumerable<BreadcrumbRenderingModel> AddChildren(Item item) => this.Rendering.Parameters["IsNavigation"] == "1" ? item.Parent.Children.Where<Item>((Func<Item, bool>)(c => c.ID.ToString() != item.ID.ToString() && this.ShowInBreadcrumb(c))).Select<Item, BreadcrumbRenderingModel>((Func<Item, BreadcrumbRenderingModel>)(i =>
        {
            return new BreadcrumbRenderingModel(i)
            {
                Name = i.Fields[Sitecore.XA.Foundation.Navigation.Templates._Navigable.Fields.NavigationTitle].Value ?? i.DisplayName,
                VariantFields = (IEnumerable<BaseVariantField>)this.VariantFields
            };
        })) : (IEnumerable<BreadcrumbRenderingModel>)new List<BreadcrumbRenderingModel>();

        public virtual IEnumerable<Item> BuildBreadcrumb(Item currentItem, Item rootItem)
        {
            rootItem = rootItem ?? this.ContentRepository.GetItem(ServiceLocator.ServiceProvider.GetService<ISiteInfoResolver>().GetStartPath(this.Context.Item));
            if (rootItem == null)
                return (IEnumerable<Item>)new Item[1]
                {
          currentItem
                };
            IList<Item> list = (IList<Item>)((IEnumerable<Item>)currentItem.Axes.GetAncestors()).ToList<Item>();
            list.Add(currentItem);
            if (list.Any<Item>((Func<Item, bool>)(a => a.ID == rootItem.ID)))
                return list.SkipWhile<Item>((Func<Item, bool>)(a => a.ID != rootItem.ID));
            return (IEnumerable<Item>)new Item[1] { rootItem };
        }

        public override IRenderingModelBase GetModel()
        {
            IEnumerable<BreadcrumbRenderingModel> breadcrumbItems = this.GetBreadcrumbItems(this.PageContext.Current, this.ContentRepository.GetItem(this.Rendering.Parameters["BreadcrumbRoot"] ?? string.Empty));
            BreadcrumbRenderingModel m = new BreadcrumbRenderingModel()
            {
                Separator = this.Rendering.Parameters["Separator"]
            };
            this.FillBaseProperties((object)m);
            if (!(breadcrumbItems is BreadcrumbRenderingModel[] breadcrumbRenderingModelArray))
                breadcrumbRenderingModelArray = breadcrumbItems.ToArray<BreadcrumbRenderingModel>();
            BreadcrumbRenderingModel[] source = breadcrumbRenderingModelArray;
            if (!((IEnumerable<BreadcrumbRenderingModel>)source).Any<BreadcrumbRenderingModel>())
            {
                IEnumerable<BreadcrumbRenderingModel> breadcrumbRenderingModels = Enumerable.Empty<BreadcrumbRenderingModel>();
                if (this.PageMode.IsExperienceEditor)
                    breadcrumbRenderingModels = new FakeBreadcrumbRepository().GetBreadcrumbItems((Item)null, (Item)null);
                m.IsFake = true;
                m.Children = breadcrumbRenderingModels;
            }
            else
                m.Children = (IEnumerable<BreadcrumbRenderingModel>)source;
            return (IRenderingModelBase)m;
        }
    }
}
