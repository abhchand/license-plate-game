class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.timestamps null: false
      t.string :name
    end
  end
end
