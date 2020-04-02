class CreateAppartments < ActiveRecord::Migration[6.0]
  def change
    create_table :appartments do |t|
      t.string :street
      t.string :city
      t.integer :postal
      t.string :state
      t.string :country
      t.float :price
      t.integer :rooms
      t.integer :user_id

      t.timestamps
    end
  end
end
