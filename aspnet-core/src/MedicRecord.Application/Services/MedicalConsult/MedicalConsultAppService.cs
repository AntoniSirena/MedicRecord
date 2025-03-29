using Abp.Application.Services;
using System;
using System.Threading.Tasks;
using MedicRecord.Services.MedicalConsult.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using MedicRecord.Global;
using MedicRecord.Domain;
using System.Linq.Dynamic.Core;
using System.Linq;
using Abp.Collections.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;

namespace MedicRecord.Services.MedicalConsult
{
    public class MedicalConsultAppService : AsyncCrudAppService<Domain.MedicalConsult, MedicalConsultDto, int, PagedMedicalConsultResultRequestDto>, IMedicalConsultAppService
    {
        private readonly IAbpSession _session;
        private readonly IRepository<StateMedicalConsult> _stateMedicalConsultRepository;

        public MedicalConsultAppService(IRepository<Domain.MedicalConsult, int> repository,
            IAbpSession session,
            IRepository<StateMedicalConsult> stateMedicalConsultRepository
            ) : base(repository)
        {
            _session = session;
            _stateMedicalConsultRepository = stateMedicalConsultRepository;
        }

        public override Task<MedicalConsultDto> CreateAsync(MedicalConsultDto input)
        {
            var state = _stateMedicalConsultRepository.GetAll().Where(x => x.Code == GlobalConfiguration.StateMedicalConsult.Open).FirstOrDefault();



            input.CreationTime = DateTime.UtcNow;
            input.CreatorUserId = _session.UserId;
            input.TenantId = _session.TenantId;
            input.StateId = state.Id;
            input.IsActive = true;
            input.Weight = 0;
            input.Size = 0;
            input.HeadCircumference = 0;
            input.StartDate = DateTime.UtcNow;
            return base.CreateAsync(input);
        }
        public override Task<MedicalConsultDto> UpdateAsync(MedicalConsultDto input)
        {
            var state = _stateMedicalConsultRepository.GetAll().Where(x => x.Code == GlobalConfiguration.StateMedicalConsult.Closed).FirstOrDefault();

            if (state.Id == input.StateId)
            {
                input.EndDate = DateTime.UtcNow;
                input.NextDate = DateTime.UtcNow.AddDays(30);
            }

            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;

            var result = base.UpdateAsync(input);

            return result;
        }

        protected override IQueryable<Domain.MedicalConsult> CreateFilteredQuery(PagedMedicalConsultResultRequestDto input)
        {
            if (!input.Keyword.IsNullOrEmpty())
            {
                var result = Repository.GetAllIncluding(x => x.Patient).Include(x => x.State).Where(x => x.Patient.FirstName.Contains(input.Keyword) ||
                x.Patient.SecondName.Contains(input.Keyword) ||
                x.Patient.FirstSurname.Contains(input.Keyword) ||
                x.Patient.SecondSurname.Contains(input.Keyword) ||
                x.Patient.MotherIDNumber.Contains(input.Keyword)
                );

                return result;
            }
            else
            {
                var result = Repository.GetAllIncluding(x => x.Patient).Include(x => x.State);

                return result;
            }
        }

    }
}
