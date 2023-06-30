import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

describe('<App />', () => {
  test('Ensure app renders as expected, given the mock datasource', () => {
    render(<App />);

    const tableElement = screen.getByTestId('product-table');
    const filtersElement = screen.getByTestId('filters');

    // Ensure the main components exist in the document
    expect(tableElement).toBeInTheDocument();
    expect(filtersElement).toBeInTheDocument();

    // Ensure the number of rows and headers/columns is correct
    const rowsElements = screen.getAllByTestId('product-table-row');
    expect(rowsElements.length).toBe(6);

    const columnElements = screen.getAllByTestId('product-table-header');
    expect(columnElements.length).toBe(5);
  });

  test('Ensure Filters initially render as expected', () => {
    render(<App />);

    // When the app first renders, the only filter visible should be the Property filter
    const propertySelector = screen.getByTestId('select-property');
    // This way, we ensure this filter is visible and all others do not exist yet
    const operatorSelector = screen.queryByTestId('operator-property');
    const inputValue = screen.queryByTestId('input-value');
    const multiselectValue = screen.queryByTestId('multiselect-value');

    expect(propertySelector).toBeInTheDocument();
    expect(operatorSelector).toBeNull();
    expect(inputValue).toBeNull();
    expect(multiselectValue).toBeNull();
  });

  test('Ensure Filters show up as expected', () => {
    const {getByTestId} = render(<App />);

    const propertySelector = screen.getByTestId('select-property');
    expect(propertySelector).toBeInTheDocument();

    // If the user selects one of the Property options, the operator Filter will be rendered
    // Option of value 1 should be 'color'
    userEvent.click(getByTestId("option-property-1"));

    const operatorSelector = screen.getByTestId('select-operator');
    expect(operatorSelector).toBeInTheDocument();

    // The 'Equals' option should be rendered, after selecting the 'color' Property earlier
    userEvent.click(getByTestId("option-operator-equals"));

    // Which means the input value filter should show up
    const valueSelector = screen.getByTestId('input-value');
    expect(valueSelector).toBeInTheDocument();
  });

  test('Ensure Filters change Products correctly', () => {
    const {getByTestId} = render(<App />);

    const propertySelector = screen.getByTestId('select-property');
    userEvent.click(getByTestId("option-property-1"));
    userEvent.click(getByTestId("option-operator-equals"));

    // User filters by products with color 'black'
    userEvent.type(getByTestId("input-value"), "black")

    // Only two products should be displayed
    const blackRowElements = screen.getAllByTestId('product-table-row');
    expect(blackRowElements.length).toBe(2);

    // User filters by products with color 'orange'
    userEvent.type(getByTestId("input-value"), "black")

    // No products should be displayed
    const orangeRowElements = screen.queryAllByTestId('product-table-row');
    expect(orangeRowElements.length).toBe(0);
  });

});
