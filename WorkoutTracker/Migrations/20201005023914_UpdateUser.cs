using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WorkoutTracker.Migrations
{
    public partial class UpdateUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_User_UserId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_SetPlans_User_UserId",
                table: "SetPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SetResults_User_UserId",
                table: "SetResults");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutPlans_User_UserId",
                table: "WorkoutPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_User_UserId",
                table: "WorkoutSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.AddColumn<byte[]>(
                name: "Salt",
                table: "Users",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Users_UserId",
                table: "Exercises",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetPlans_Users_UserId",
                table: "SetPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetResults_Users_UserId",
                table: "SetResults",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutPlans_Users_UserId",
                table: "WorkoutPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_Users_UserId",
                table: "WorkoutSessions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Users_UserId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_SetPlans_Users_UserId",
                table: "SetPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SetResults_Users_UserId",
                table: "SetResults");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutPlans_Users_UserId",
                table: "WorkoutPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSessions_Users_UserId",
                table: "WorkoutSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_User_UserId",
                table: "Exercises",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetPlans_User_UserId",
                table: "SetPlans",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SetResults_User_UserId",
                table: "SetResults",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutPlans_User_UserId",
                table: "WorkoutPlans",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSessions_User_UserId",
                table: "WorkoutSessions",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
