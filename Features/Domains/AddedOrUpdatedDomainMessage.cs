using DomainService.Model;
using DomainService.Features.Core;
using System;

namespace DomainService.Features.Domains
{

    public class AddedOrUpdatedDomainMessage : BaseEventBusMessage
    {
        public AddedOrUpdatedDomainMessage(Domain domain, Guid correlationId, Guid tenantId)
        {
            Payload = new { Entity = domain, CorrelationId = correlationId };
            TenantUniqueId = tenantId;
        }
        public override string Type { get; set; } = DomainsEventBusMessages.AddedOrUpdatedDomainMessage;        
    }
}
