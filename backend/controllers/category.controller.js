import { HazardCategory, HazardReport, sequelize } from '../models/index.js';

export const createCategory = async (req, res, next) => {
  try {
    const { name, color } = req.body;

    const existing = await HazardCategory.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists.',
      });
    }

    const category = await HazardCategory.create({ name, color });
    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await HazardCategory.findAll({
      attributes: [
        'id',
        'name',
        'color',
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM hazard_reports AS r
            WHERE r.categoryId = HazardCategory.id
          )`),
          'value', // rename to 'value' to match Recharts expected bar/pie chart field
        ],
      ],
      order: [['name', 'ASC']],
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const category = await HazardCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    if (name && name !== category.name) {
      const existing = await HazardCategory.findOne({ where: { name } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Category name already exists.',
        });
      }
      category.name = name;
    }

    if (color) category.color = color;

    await category.save();
    res.json({
      success: true,
      message: 'Category updated successfully.',
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await HazardCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.',
      });
    }

    await category.destroy();
    res.json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
