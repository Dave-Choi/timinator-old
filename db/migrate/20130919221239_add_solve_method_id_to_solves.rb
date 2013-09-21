class AddSolveMethodIdToSolves < ActiveRecord::Migration
  def change
    add_column :solves, :solve_method_id, :integer
    add_index :solves, :solve_method_id
  end
end
