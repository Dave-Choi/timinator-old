class CreateSolves < ActiveRecord::Migration
  def change
    create_table :solves do |t|
      t.datetime :datetime
      t.string :scramble

      t.timestamps
    end
  end
end
