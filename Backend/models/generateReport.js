const Order = require("../models/Order");
const Rent = require("../models/Rent");

const generateReport = async () => {
  try {
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
    const currentYear = currentDate.getFullYear();

    // Calculate the first day and last day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1); // Subtracting 1 to get zero-based month index
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

    // Define query conditions for orders
    const orderConditions = {
      OrderDate: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    };

    // Define query conditions for rentals
    const rentConditions = {
      RentDate: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    };

    // Fetch total orders this month
    const totalOrders = await Order.countDocuments(orderConditions);

    // Fetch total new orders this month
    const totalNewOrders = await Order.countDocuments({
      ...orderConditions,
      Status: "New",
    });

    // Fetch total pending orders this month
    const totalPendingOrders = await Order.countDocuments({
      ...orderConditions,
      Status: "Pending",
    });

    // Fetch total finished orders this month
    const totalFinishedOrders = await Order.countDocuments({
      ...orderConditions,
      Status: "Finished",
    });

    // Fetch total profit by orders this month
    const totalProfitByOrders = await Order.aggregate([
      { $match: orderConditions },
      { $group: { _id: null, totalProfit: { $sum: "$TotalAmount" } } },
    ]);

    // Fetch total rentals this month
    const totalRentals = await Rent.countDocuments(rentConditions);

    // Fetch total new rentals this month
    const totalNewRentals = await Rent.countDocuments({
      ...rentConditions,
      Status: "New",
    });

    // Fetch total pending rentals this month
    const totalPendingRentals = await Rent.countDocuments({
      ...rentConditions,
      Status: "Pending",
    });

    // Fetch total finished rentals this month
    const totalFinishedRentals = await Rent.countDocuments({
      ...rentConditions,
      Status: "Finished",
    });

    // Fetch total profit by rentals this month
    const totalProfitByRentals = await Rent.aggregate([
      { $match: rentConditions },
      { $group: { _id: null, totalProfit: { $sum: "$Payment" } } },
    ]);

    // Construct and return the report data
    const reportData = {
      totalOrders,
      totalNewOrders,
      totalPendingOrders,
      totalFinishedOrders,
      totalProfitByOrders:
        totalProfitByOrders.length > 0 ? totalProfitByOrders[0].totalProfit : 0,
      totalRentals,
      totalNewRentals,
      totalPendingRentals,
      totalFinishedRentals,
      totalProfitByRentals:
        totalProfitByRentals.length > 0
          ? totalProfitByRentals[0].totalProfit
          : 0,
    };

    return reportData;
  } catch (error) {
    throw new Error("Error generating report: " + error.message);
  }
};

module.exports = generateReport;
