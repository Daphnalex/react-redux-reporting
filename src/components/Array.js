import React, { Component } from 'react'

import Filters from "./FiltersComponent";


export default class ArrayComponent extends Component {
  constructor(props){
      super(props);
      this.state = {
          loading: true,
          item: this.props.item,
          data: []
      }
  }

  render() {
      console.log('item',this.props.data)
    return (
      <div>
        {this.props.dataIsLoading.bool ?
            <div>
                Donnée en cours de chargement
            </div>
            :
            <div>
                <h2>{this.props.item.describeElement.data} {this.props.item.describeElement.filterDate.toLowerCase()} ({this.props.item.describeElement.graph})</h2>
                <Filters item={this.props.item} />
                <div key={`Pie${this.props.data.id}`}>
                    {(this.props.data.id === this.props.item.id) ?
                        <div>
                            <table className='arrayComponent'>
                                <thead>
                                <tr>
                                    <th>{this.state.item.describeElement.filterDate}</th>
                                    <th>Valeur</th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.props.data.array.map((item,i)=>(
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.result}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>Donnée non trouvée</div>
                    }
                </div>
            </div>
            }
      </div>
    )
  }
}
