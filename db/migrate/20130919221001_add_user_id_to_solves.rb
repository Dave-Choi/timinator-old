class AddUserIdToSolves < ActiveRecord::Migration
  def change
    add_column :solves, :user_id, :integer
    add_index :solves, :user_id
  end
end
