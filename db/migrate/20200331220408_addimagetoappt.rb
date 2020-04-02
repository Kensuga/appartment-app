class Addimagetoappt < ActiveRecord::Migration[6.0]
  def change
    add_column :appartments, :image, :string
  end
end
