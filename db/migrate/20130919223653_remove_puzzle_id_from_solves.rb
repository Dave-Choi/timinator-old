class RemovePuzzleIdFromSolves < ActiveRecord::Migration
  def change
    remove_index :solves, :puzzle_id
    remove_column :solves, :puzzle_id, :integer
  end
end
