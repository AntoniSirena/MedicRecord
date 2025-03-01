using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicRecord.Services
{
    /// <summary>
    /// Clase Modelo para los DTO's
    /// </summary>
    [Serializable]
    public class ComboboxItemDto
    {
        /// <summary>
        /// Value of the item.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Display text of the item.
        /// </summary>
        public string DisplayText { get; set; }

        /// <summary>
        /// Is selected?
        /// </summary>
        public bool IsSelected { get; set; }
    }
}
