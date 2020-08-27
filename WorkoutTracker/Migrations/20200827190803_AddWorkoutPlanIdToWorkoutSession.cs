using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkoutTracker.Migrations
{
    public partial class AddWorkoutPlanIdToWorkoutSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlans_WorkoutPlanId",
                table: "WorkoutSessions");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutPlanId",
                table: "WorkoutSessions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlans_WorkoutPlanId",
                table: "WorkoutSessions",
                column: "WorkoutPlanId",
                principalTable: "WorkoutPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlans_WorkoutPlanId",
                table: "WorkoutSessions");

            migrationBuilder.AlterColumn<int>(
                name: "WorkoutPlanId",
                table: "WorkoutSessions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_WorkoutPlans_WorkoutPlanId",
                table: "WorkoutSessions",
                column: "WorkoutPlanId",
                principalTable: "WorkoutPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
