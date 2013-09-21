class AddPuzzleIdToSolves < ActiveRecord::Migration
  def change
    add_column :solves, :puzzle_id, :integer
    add_index :solves, :puzzle_id
  end
end
