class CreatePropositions < ActiveRecord::Migration[7.1]
  def change
    create_table :propositions do |t|
      t.string :body
      t.string :category
      t.references :connection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
