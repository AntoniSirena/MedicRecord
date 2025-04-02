using MedicRecord.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox.Dto
{

    /// <summary>
    /// Clase para para Devolver el Dto con la Info de los DropDawn
    /// </summary>
    public class CommonComboBoxOutputDto
    {
        /// <summary>
        /// 
        /// </summary>
        public CommonComboBoxOutputDto()
        {
            BloodTypes = new List<ComboboxItemDto>();
            MedicalCenters = new List<ComboboxItemDto>();
            StateMedicalConsults = new List<ComboboxItemDto>();
            MedicalAges = new List<ComboboxItemDto>();
            Patients = new List<ComboboxItemDto>();
            Diseases = new List<ComboboxItemDto>();
            Symptoms = new List<ComboboxItemDto>();
        }
        /// <summary>
        /// 
        /// </summary>
        public List<ComboboxItemDto> BloodTypes { get; set; }
        public List<ComboboxItemDto> MedicalCenters { get; set; }
        public List<ComboboxItemDto> StateMedicalConsults { get; set; }
        public List<ComboboxItemDto> MedicalAges { get; set; }
        public List<ComboboxItemDto> Patients { get; set; }
        public List<ComboboxItemDto> Diseases { get; set; }
        public List<ComboboxItemDto> Symptoms { get; set; }

    }
}
