class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :phone
      t.string :hours
      t.integer :user_id

      t.timestamps
    end
  end
end
