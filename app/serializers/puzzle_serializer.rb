class PuzzleSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :name, :slug
  has_many :solve_methods
end
