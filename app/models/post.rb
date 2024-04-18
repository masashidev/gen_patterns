class Post < ApplicationRecord
  belongs_to :category

  has_many :post_connections
  has_many :related_posts, through: :post_connections, source: :related_post
end
