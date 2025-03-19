using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services.CommonComboBox.Dto
{
    /// <summary>
    /// Clase Modelo para los DTO's
    /// </summary>
    [Serializable]
    public class ComboboxItemDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string DisplayText { get; set; }
    }
}
