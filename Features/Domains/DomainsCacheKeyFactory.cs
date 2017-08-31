using System;

namespace DomainService.Features.Domains
{
    public class DomainsCacheKeyFactory
    {
        public static string Get(Guid tenantId) => $"[Domains] Get {tenantId}";
        public static string GetById(Guid tenantId, int id) => $"[Domains] GetById {tenantId}-{id}";
    }
}
