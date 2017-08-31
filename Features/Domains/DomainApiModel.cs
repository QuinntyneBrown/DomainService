using DomainService.Model;

namespace DomainService.Features.Domains
{
    public class DomainApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromDomain<TModel>(Domain domain) where
            TModel : DomainApiModel, new()
        {
            var model = new TModel();
            model.Id = domain.Id;
            model.TenantId = domain.TenantId;
            model.Name = domain.Name;
            return model;
        }

        public static DomainApiModel FromDomain(Domain domain)
            => FromDomain<DomainApiModel>(domain);

    }
}
