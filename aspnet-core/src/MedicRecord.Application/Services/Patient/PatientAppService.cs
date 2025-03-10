using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MedicRecord.Services.Patient.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.Collections.Extensions;
using Microsoft.AspNetCore.Mvc;
using MedicRecord.Domain;
using MedicRecord.Services.CommonComboBox.Dto;

namespace MedicRecord.Services.Patient
{
    public class PatientAppService : AsyncCrudAppService<Domain.Patient, PatientDto, int, PagedPatientResultPatientDto>, IPatientAppService
    {
        private readonly IAbpSession _session;
        public PatientAppService(IRepository<Domain.Patient, int> repository, IAbpSession session
            ) : base(repository)
        {
            _session = session;
            
        }

        public override Task<PatientDto> CreateAsync(PatientDto input)
        {
            input.CreationTime = DateTime.UtcNow;
            input.CreatorUserId = _session.UserId;
            input.TenantId = _session.TenantId;
            input.IsActive = true;
            return base.CreateAsync(input);
        }

        public override Task<PatientDto> UpdateAsync(PatientDto input)
        {
            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;
            return base.UpdateAsync(input);
        }

        protected override IQueryable<Domain.Patient> CreateFilteredQuery(PagedPatientResultPatientDto input)
        {
            if (!input.Keyword.IsNullOrEmpty())
            {
                return Repository.GetAll().Where(x => x.RecordNumber.Contains(input.Keyword) || x.FirstName.Contains(input.Keyword) ||
                                                                                         x.SecondName.Contains(input.Keyword) ||
                                                                                         x.FirstSurname.Contains(input.Keyword) ||
                                                                                         x.SecondSurname.Contains(input.Keyword) ||
                                                                                         x.MotherNames.Contains(input.Keyword) ||
                                                                                         x.MotherSurnames.Contains(input.Keyword) ||
                                                                                         x.MotherIDNumber.Contains(input.Keyword) );
            }
            else
            {
                return Repository.GetAll();
            }
        }

    }
}
