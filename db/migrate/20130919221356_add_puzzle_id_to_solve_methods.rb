class AddPuzzleIdToSolveMethods < ActiveRecord::Migration
  def change
    add_column :solve_methods, :puzzle_id, :integer
    add_index :solve_methods, :puzzle_id
  end
end
