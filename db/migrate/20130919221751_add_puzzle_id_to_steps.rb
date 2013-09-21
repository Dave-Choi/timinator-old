class AddPuzzleIdToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :puzzle_id, :integer
    add_index :steps, :puzzle_id
  end
end
