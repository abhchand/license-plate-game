class CreateSightings < ActiveRecord::Migration[5.0]
  def change
    create_table :sightings do |t|
      t.timestamps null: false
      t.references :player
      t.string :state
    end
  end
end
