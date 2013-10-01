class StepResultSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :time
  has_one :solve, :step
end
