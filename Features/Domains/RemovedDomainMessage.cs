using DomainService.Features.Core;
using System;

namespace DomainService.Features.Domains
{
    public class RemovedDomainMessage : BaseEventBusMessage
    {
        public RemovedDomainMessage(int domainId, Guid correlationId, Guid tenantId)
        {
            Payload = new { Id = domainId, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = DomainsEventBusMessages.RemovedDomainMessage;        
    }
}
