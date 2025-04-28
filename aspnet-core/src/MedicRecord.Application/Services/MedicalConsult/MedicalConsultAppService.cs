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
using Abp.UI;
using Abp.Domain.Uow;
using Microsoft.AspNetCore.Mvc;
using Abp.Authorization;
using MedicRecord.Authorization;

namespace MedicRecord.Services.MedicalConsult
{
    [AbpAuthorize(PermissionNames.Pages_MedicalConsults)]
    public class MedicalConsultAppService : AsyncCrudAppService<Domain.MedicalConsult, MedicalConsultDto, int, PagedMedicalConsultResultRequestDto>, IMedicalConsultAppService
    {
        private readonly IAbpSession _session;
        private readonly IRepository<StateMedicalConsult> _stateMedicalConsultRepository;
        private readonly IRepository<MedicalConsultDisease> _medicalConsultDiseaseRepository;
        private readonly IRepository<MedicalConsultSymptom> _medicalConsultSymptomRepository;
        private readonly IRepository<Domain.Patient> _patientRepository;

        public MedicalConsultAppService(IRepository<Domain.MedicalConsult, int> repository,
            IAbpSession session,
            IRepository<StateMedicalConsult> stateMedicalConsultRepository,
            IRepository<MedicalConsultDisease> medicalConsultDiseaseRepository,
            IRepository<MedicalConsultSymptom> medicalConsultSymptomRepository,
            IRepository<Domain.Patient> patientRepository

            ) : base(repository)
        {
            _session = session;
            _stateMedicalConsultRepository = stateMedicalConsultRepository;
            _medicalConsultDiseaseRepository = medicalConsultDiseaseRepository;
            _medicalConsultSymptomRepository = medicalConsultSymptomRepository;
            _patientRepository = patientRepository;
        }

        public override Task<MedicalConsultDto> CreateAsync(MedicalConsultDto input)
        {
            var state = _stateMedicalConsultRepository.GetAll().Where(x => x.Code == GlobalConfiguration.StateMedicalConsult.Open).FirstOrDefault();

            var consults = Repository.GetAll().Where(x => x.PatientId == input.PatientId && x.StateId == state.Id && x.IsActive == true && x.IsDeleted == false).ToList();

            if (consults.Count > 0)
            {
                throw new UserFriendlyException("El paciente ya tiene una consulta abierta");
            }

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

        public override async Task<MedicalConsultDto> UpdateAsync(MedicalConsultDto input)
        {
            input.LastModificationTime = DateTime.UtcNow;
            input.LastModifierUserId = _session.UserId;

            var resultBase = await base.UpdateAsync(input);


            if (input.Diseases.Count > 0)
            {
                var _diseases = _medicalConsultDiseaseRepository.GetAll().Where(x => x.MedicalConsultId == resultBase.Id).ToList();

                foreach (var item in _diseases)
                {
                    await _medicalConsultDiseaseRepository.DeleteAsync(item.Id);
                }

                foreach (var item in input.Diseases)
                {
                    var entityModel = new MedicalConsultDisease();
                    entityModel.MedicalConsultId = input.Id;
                    entityModel.DiseaseId = item;
                    entityModel.CreationTime = DateTime.UtcNow;
                    entityModel.CreatorUserId = _session.UserId;
                    entityModel.TenantId = _session.TenantId;
                    entityModel.IsActive = true;

                    await _medicalConsultDiseaseRepository.InsertAsync(entityModel);
                }
            }
            else
            {
                var _diseases = _medicalConsultDiseaseRepository.GetAll().Where(x => x.MedicalConsultId == resultBase.Id).ToList();

                foreach (var item in _diseases)
                {
                    await _medicalConsultDiseaseRepository.DeleteAsync(item.Id);
                }
            }

            if (input.Symptoms.Count > 0)
            {
                var _symptoms = _medicalConsultSymptomRepository.GetAll().Where(x => x.MedicalConsultId == resultBase.Id).ToList();

                foreach (var item in _symptoms)
                {
                    await _medicalConsultSymptomRepository.DeleteAsync(item.Id);
                }

                foreach (var item in input.Symptoms)
                {
                    var entityModel = new MedicalConsultSymptom();
                    entityModel.MedicalConsultId = input.Id;
                    entityModel.SymptomId = item;
                    entityModel.CreationTime = DateTime.UtcNow;
                    entityModel.CreatorUserId = _session.UserId;
                    entityModel.TenantId = _session.TenantId;
                    entityModel.IsActive = true;

                    await _medicalConsultSymptomRepository.InsertAsync(entityModel);
                }
            }
            else
            {
                var _symptoms = _medicalConsultSymptomRepository.GetAll().Where(x => x.MedicalConsultId == resultBase.Id).ToList();

                foreach (var item in _symptoms)
                {
                    await _medicalConsultSymptomRepository.DeleteAsync(item.Id);
                }
            }

            return resultBase;
        }

        protected override IQueryable<Domain.MedicalConsult> CreateFilteredQuery(PagedMedicalConsultResultRequestDto input)
        {
            if (!input.Keyword.IsNullOrEmpty())
            {
                var result = Repository.GetAllIncluding(x => x.Patient).Include(x => x.Patient.MedicalCenter).Include(x => x.State).Where(x => x.Patient.FirstName.Contains(input.Keyword) ||
                x.Patient.SecondName.Contains(input.Keyword) ||
                x.Patient.FirstSurname.Contains(input.Keyword) ||
                x.Patient.SecondSurname.Contains(input.Keyword) ||
                x.Patient.MotherIDNumber.Contains(input.Keyword) ||
                x.Patient.MedicalCenter.Name.Contains(input.Keyword) ||
                x.State.Name.Contains(input.Keyword)
                );

                return result;
            }
            else
            {
                var result = Repository.GetAllIncluding(x => x.Patient).Include(x => x.Patient.MedicalCenter).Include(x => x.State);

                return result;
            }
        }

        [HttpGet]
        public MedicalConsultDto GetData(int id)
        {
            var result = new MedicalConsultDto();

            var consult = Repository.GetAll().Where(x => x.Id == id).FirstOrDefault();

            result.Diseases = _medicalConsultDiseaseRepository.GetAll().Where(x => x.MedicalConsultId == id).Select(x => x.DiseaseId).ToList();

            result.Symptoms = _medicalConsultSymptomRepository.GetAll().Where(x => x.MedicalConsultId == id).Select(x => x.SymptomId).ToList();

            result.Patient = _patientRepository.GetAll().Where(x => x.Id == consult.PatientId).FirstOrDefault();

            return result;
        }

        [HttpGet]
        public void ClosedConsult(int id)
        {
            var state = _stateMedicalConsultRepository.GetAll().Where(x => x.Code == GlobalConfiguration.StateMedicalConsult.Closed).FirstOrDefault();

            var consult = Repository.GetAll().Where(x => x.Id == id).FirstOrDefault();

            consult.EndDate = DateTime.UtcNow;
            consult.NextDate = DateTime.UtcNow.AddDays(30);
            consult.StateId = state.Id;
            consult.IsClosed = true;

            Repository.Update(consult);
        }
    }
}
