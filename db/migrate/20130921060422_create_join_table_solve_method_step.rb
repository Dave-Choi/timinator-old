class CreateJoinTableSolveMethodStep < ActiveRecord::Migration
  def change
    create_join_table :solve_methods, :steps do |t|
      # t.index [:solve_method_id, :step_id]
      # t.index [:step_id, :solve_method_id]
    end
  end
end
