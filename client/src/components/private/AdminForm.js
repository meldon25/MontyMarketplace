import React, { Component } from 'react'
import '../../styles/AdminForm.css'
import PublicServices from '../../services/PublicServices'
import AuthService from '../../services/AuthServices'
import UploadForm from './components/UploadForm'
import DropDown from './components/Dropdowns'
import DetailCard from './components/DetailCard'
export default class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.PublicService = new PublicServices()
    this.AuthService = new AuthService()
    this.state = {
      itemData: {
        name: '',
        brand: '',
        image_url: '',
        description: '',
        cost: '',
        price: ''
      },
      detailData: {
        quantity: '',
        size: '',
        color: ''
      },
      clearance: false,
      category: '',
      subCategory: '',
      images: [],
      details: [],
      categories: [],
      subCategories: []
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  handlePrimaryDropDown = value => {
    let index = value
    this.setState(state => {
      state.subCategories = state.categories[index].subCategories
      state.category = state.categories[index]._id
      state.subCategory = state.categories[0]._id
      return state
    })
  }

  getCategories = async () => {
    try {
      const categories = await this.PublicService.getCategories()
      categories.forEach(category => {
        this.setState(state => {
          state.categories = [...state.categories, category]
          state.category = categories[0]._id
          state.subCategory = categories[0].subCategories[0]._id
          state.subCategories = categories[0].subCategories
          return state
        })
      })
    } catch (error) {
      throw error
    }
  }

  renderCategories = () =>
    this.state.categories.length ? (
      <DropDown
        categories={this.state.categories}
        label="Primary Categories"
        name="category"
        onChange={this.handlePrimaryDropDown}
      />
    ) : null

  renderSubCategories = () =>
    this.state.subCategories.length ? (
      <DropDown
        categories={this.state.subCategories}
        label="Sub Categories"
        name="subCategory"
        value="category"
        onChange={this.handleChange}
      />
    ) : null

  removeDetail = index => {
    const details = this.state.details
    details.splice(index, 1)
    this.setState({ details })
  }

  handleSubmit = async e => {
    e.preventDefault()
  }

  renderDetails = () => {
    const { details } = this.state
    if (details.length) {
      return <DetailCard details={details} onClick={this.removeDetail} />
    }
  }

  handleChange = (value, name, dataValue) => {
    dataValue
      ? this.setState(state => {
          const values = { [name]: value }
          state[dataValue] = Object.assign(state[dataValue], values)
          return state
        })
      : this.setState({ [name]: value })
  }

  addItemToArray = (listType, values) => {
    this.setState(
      state => ({ [listType]: [...state[listType], values] }),
      () => {
        for (const key in values) {
          this.setState(state => {
            state.detailData[key] = ''
            return state
          })
        }
      }
    )
  }

  render() {
    const {
      detailData: { color, size, price, quantity }
    } = this.state
    return (
      <div className="wrapper form-container">
        <div className="form-wrapper">
          <form className="form-col" onSubmit={this.handleSubmit}>
            <UploadForm
              formData={this.state.itemData}
              onChange={this.handleChange}
              dataValue="itemData"
            />
            <label htmlFor="clearance">Clearance Item</label>
            <select
              name="clearance"
              onChange={e => this.handleChange('clearance', e.target.value)}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {this.renderCategories()}
            {this.renderSubCategories()}
            <div className=" item-details">
              <h3>Item Details</h3>
              <div className="input-wrapper row">
                <UploadForm
                  formData={this.state.detailData}
                  onChange={this.handleChange}
                  dataValue="detailData"
                />
                <button
                  type="button"
                  onClick={() =>
                    this.addItemToArray('details', {
                      color,
                      quantity,
                      size
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>

        {this.renderDetails()}
      </div>
    )
  }
}
