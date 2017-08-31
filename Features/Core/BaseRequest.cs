using System;

namespace DomainService.Features.Core
{
    public class BaseRequest 
    {
        public Guid TenantUniqueId { get; set; }
    }
}