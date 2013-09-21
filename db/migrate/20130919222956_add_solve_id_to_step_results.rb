class AddSolveIdToStepResults < ActiveRecord::Migration
  def change
    add_column :step_results, :solve_id, :integer
    add_index :step_results, :solve_id
  end
end
