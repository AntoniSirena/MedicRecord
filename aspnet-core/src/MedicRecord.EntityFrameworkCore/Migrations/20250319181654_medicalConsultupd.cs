using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedicRecord.Migrations
{
    /// <inheritdoc />
    public partial class medicalConsultupd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Size",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "HeadCircumference",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "MedicalConsults",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalConsults_StateId",
                table: "MedicalConsults",
                column: "StateId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalConsults_StateMedicalConsults_StateId",
                table: "MedicalConsults",
                column: "StateId",
                principalTable: "StateMedicalConsults",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalConsults_StateMedicalConsults_StateId",
                table: "MedicalConsults");

            migrationBuilder.DropIndex(
                name: "IX_MedicalConsults_StateId",
                table: "MedicalConsults");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "MedicalConsults");

            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Size",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "HeadCircumference",
                table: "MedicalConsults",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);
        }
    }
}
