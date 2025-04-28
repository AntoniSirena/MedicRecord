using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using MedicRecord.Domain;
using MedicRecord.Services.CommonComboBox.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox
{
    [AbpAuthorize]
    public class CommonComboBoxAppService : MedicRecordAppServiceBase, ICommonComboBoxAppService
    {
        private readonly IAbpSession _session;
        private readonly IRepository<BloodType> bloodTypeRepository;
        private readonly IRepository<Domain.MedicalCenter> medicalCenterRepository;
        private readonly IRepository<StateMedicalConsult> stateMedicalConsultRepository;
        private readonly IRepository<MedicalAge> medicalAgeRepository;
        private readonly IRepository<Domain.Patient> patientRepository;
        private readonly IRepository<Domain.Disease> diseaseRepository;
        private readonly IRepository<Domain.Symptom> symptomRepository;


        public CommonComboBoxAppService(
            IAbpSession session,
            IRepository<BloodType> _bloodTypeRepository,
            IRepository<Domain.MedicalCenter> _medicalCenterRepository,
            IRepository<StateMedicalConsult> _stateMedicalConsultRepository,
            IRepository<MedicalAge> _medicalAgeRepository,
            IRepository<Domain.Patient> _patientRepository,
            IRepository<Domain.Disease> _diseaseRepository,
            IRepository<Domain.Symptom> _symptomRepository
            )
        {
            _session = session;
            bloodTypeRepository = _bloodTypeRepository;
            medicalCenterRepository = _medicalCenterRepository;
            stateMedicalConsultRepository = _stateMedicalConsultRepository;
            medicalAgeRepository = _medicalAgeRepository;
            patientRepository = _patientRepository;
            diseaseRepository = _diseaseRepository;
            symptomRepository = _symptomRepository;
        }

        [HttpPost]
        public async Task<CommonComboBoxOutputDto> GetComboBoxes()
        {
            CommonComboBoxOutputDto output = new CommonComboBoxOutputDto();

            var bloodTypes = bloodTypeRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var medicalCenters = medicalCenterRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var stateMedicalConsults = stateMedicalConsultRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var medicalAges = medicalAgeRepository.GetAll().Where(x => x.IsDeleted == false);
            var patients = patientRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.FirstName);
            var diseases = diseaseRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var symptoms = symptomRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);


            output.BloodTypes = bloodTypes.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.MedicalCenters = medicalCenters.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Name, DisplayText = x.Name }).ToList();
            output.StateMedicalConsults = stateMedicalConsults.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.MedicalAges = medicalAges.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.Patients = patients.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.RecordNumber, DisplayText = x.FirstName +" "+ x.SecondName + " " +  x.FirstSurname + " " +  x.SecondSurname}).ToList();
            output.Diseases = diseases.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name}).ToList();
            output.Symptoms = symptoms.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();

            return await Task.Run(() => output);
        }

    }
}
