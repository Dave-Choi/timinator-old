class AddStepIdToStepResults < ActiveRecord::Migration
  def change
    add_column :step_results, :step_id, :integer
    add_index :step_results, :step_id
  end
end
