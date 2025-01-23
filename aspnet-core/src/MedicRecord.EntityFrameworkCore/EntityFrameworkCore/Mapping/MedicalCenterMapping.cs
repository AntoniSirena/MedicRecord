using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MedicRecord.Domain;

namespace MedicRecord.EntityFrameworkCore.Mapping
{
    public class MedicalCenterMapping : IEntityTypeConfiguration<Domain.MedicalCenter>
    {
        public void Configure(EntityTypeBuilder<MedicalCenter> builder)
        {
            builder.Property(x => x.Name)
                .IsRequired();

            builder.HasIndex(x => x.Name)
                .IsUnique();
        }
    }
}
