class CreateSolveMethods < ActiveRecord::Migration
  def change
    create_table :solve_methods do |t|
      t.string :name

      t.timestamps
    end
  end
end
