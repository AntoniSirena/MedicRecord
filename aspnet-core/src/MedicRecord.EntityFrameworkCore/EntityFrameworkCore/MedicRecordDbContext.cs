using Abp.Zero.EntityFrameworkCore;
using MedicRecord.Authorization.Roles;
using MedicRecord.Authorization.Users;
using MedicRecord.Domain;
using MedicRecord.MultiTenancy;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace MedicRecord.EntityFrameworkCore;

public class MedicRecordDbContext : AbpZeroDbContext<Tenant, Role, User, MedicRecordDbContext>
{
    /* Define a DbSet for each entity of the application */

    public DbSet<MedicalCenter> MedicalCenters { get; set; }
    public DbSet<Symptom> Symptoms { get; set; }

    public DbSet<Disease> Diseases { get; set; }

    public MedicRecordDbContext(DbContextOptions<MedicRecordDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
