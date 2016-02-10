class AddViewCountToProperties < ActiveRecord::Migration
  def change
  	add_column :properties, :contact_info_view_count, :integer, :default => 0
  end
end
