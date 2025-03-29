using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using MedicRecord.Domain;
using MedicRecord.Services.CommonComboBox.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox
{
    public class CommonComboBoxAppService : MedicRecordAppServiceBase, ICommonComboBoxAppService
    {
        private readonly IAbpSession _session;
        private readonly IRepository<BloodType> bloodTypeRepository;
        private readonly IRepository<Domain.MedicalCenter> medicalCenterRepository;
        private readonly IRepository<StateMedicalConsult> stateMedicalConsultRepository;
        private readonly IRepository<MedicalAge> medicalAgeRepository;
        private readonly IRepository<Domain.Patient> patientRepository;

        public CommonComboBoxAppService(
            IAbpSession session,
            IRepository<BloodType> _bloodTypeRepository,
            IRepository<Domain.MedicalCenter> _medicalCenterRepository,
            IRepository<StateMedicalConsult> _stateMedicalConsultRepository,
            IRepository<MedicalAge> _medicalAgeRepository,
            IRepository<Domain.Patient> _patientRepository
            )
        {
            _session = session;
            bloodTypeRepository = _bloodTypeRepository;
            medicalCenterRepository = _medicalCenterRepository;
            stateMedicalConsultRepository = _stateMedicalConsultRepository;
            medicalAgeRepository = _medicalAgeRepository;
            patientRepository = _patientRepository;
        }

        [HttpPost]
        public async Task<CommonComboBoxOutputDto> GetComboBoxes()
        {
            CommonComboBoxOutputDto output = new CommonComboBoxOutputDto();

            var bloodTypes = bloodTypeRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var medicalCenters = medicalCenterRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var stateMedicalConsults = stateMedicalConsultRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var medicalAges = medicalAgeRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.Name);
            var patients = patientRepository.GetAll().Where(x => x.IsDeleted == false).OrderBy(t => t.FirstName);

            output.BloodTypes = bloodTypes.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.MedicalCenters = medicalCenters.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Name, DisplayText = x.Name }).ToList();
            output.StateMedicalConsults = stateMedicalConsults.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.MedicalAges = medicalAges.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.Code, DisplayText = x.Name }).ToList();
            output.Patients = patients.Select(x => new ComboboxItemDto { Id = x.Id, Code = x.RecordNumber, DisplayText = x.FirstName +" "+ x.SecondName + " " +  x.FirstSurname + " " +  x.SecondSurname}).ToList();

            return await Task.Run(() => output);
        }

    }
}
