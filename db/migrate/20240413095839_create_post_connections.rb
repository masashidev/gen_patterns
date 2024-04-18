class CreatePostConnections < ActiveRecord::Migration[7.1]
  def change
    create_table :post_connections do |t|
      t.references :post, null: false, foreign_key: true
      t.references :related_post, null: false, foreign_key: { to_table: :posts }

      t.timestamps
    end
  end
end
