import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { Button } from "react-bulma-components";

const CategoriesView = ({ categoriesTree }) => {
  return (
    <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className="accordion__button has-background-dark has-text-light">
            All Categories
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="bg-0">
          {categoriesTree.map(parent => (
            <AccordionItem key={parent.id}>
              <AccordionItemHeading>
                <AccordionItemButton>{parent.name}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="bg-0">
                {parent.children.map(child => (
                  <Button key={child.id} className="is-white is-fullwidth">
                    {child.name}
                  </Button>
                ))}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

CategoriesView.propTypes = {
  categoriesTree: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    })
  )
};

export default CategoriesView;