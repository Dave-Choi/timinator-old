Timinator.StepResult = DS.Model.extend(Timinator.Trashable, {
	time: DS.attr("number"),

	solve: DS.belongsTo("solve"),
	step: DS.belongsTo("step"),
});