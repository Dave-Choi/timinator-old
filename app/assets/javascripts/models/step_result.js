Timinator.StepResult = DS.Model.extend(Timinator.Trashable, {
	time: DS.attr("number"),

	solve: DS.belongsTo("Timinator.Solve"),
	step: DS.belongsTo("Timinator.Step")
});